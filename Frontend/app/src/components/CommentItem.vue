<template>
    <article class="comment-card">
        <div class="comment-card__caption">
            <IconCommentAuthor />
            <span>{{ firstname }} {{ lastname }}</span>
            <IconDate /> 
            <span v-bind:title="calendarDate">{{ relativeDate }}</span>   
        </div>

        <div class="comment-card__content comment-card__content--update content-update" v-if="currentlyUpdating">
            <label for="contentCommentUpdate">Commentaire à mettre à jour:</label>
            <textarea id="contentCommentUpdate" class="content-update__textarea" v-model="updatingContent" rows="4" required></textarea>
            <div class="content-update__buttons update-buttons">
                <button class="update-buttons__item" @click.prevent="updateComment">Confirmer</button>
                <button class="update-buttons__item" @click.prevent="closeUpdateForm">Annuler</button>
            </div>
        </div>

        <p v-else class="comment-card__content">{{ content }}</p>
        <div class="comment-card__buttons" v-if="isAdmin || isAuthor">
            <button title="Éditer le commentaire" class="button-edit" @click.prevent="openUpdateForm">
                <IconEdit />
            </button>
            <button title="Supprimer le commentaire" class="button-delete" @click.prevent="deleteComment">
                <IconTrash />
            </button>
        </div>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import IconTrash from './icons/IconTrash.vue'
import IconCommentAuthor from './icons/IconCommentAuthor.vue'
import IconDate from './icons/IconDate.vue'
import IconEdit from './icons/IconEdit.vue'

export default {
    name: 'CommentItem',
    components: {
        IconTrash,
        IconCommentAuthor,
        IconDate,
        IconEdit
    },
    data() {
        return {
            relativeDate: '',
            calendarDate: '',
            currentlyUpdating: false,
            updatingContent:''
        }
    },
    computed: {
        ...mapState([
        'accessToken',
        'userId',
        'userRole'
        ]),
        isAuthor() {
            return this.userId == this.authorId ? true : false;
        },
        isAdmin() {
            return this.userRole == 'ADMIN' ? true : false;
        }
    },
    props: {
        commentId: {
            type: Number
        },
        date: {},
        content: {
            type: String
        },
        authorId: {
            type: Number
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        }
    },
    methods: {
        getDate() {
            moment.locale("fr");
            this.relativeDate = moment(this.date).fromNow()
            this.calendarDate = moment(this.date).format('LLLL')
        },
        deleteComment() {
            if (confirm('Etes-vous certain de vouloir supprimer ce commentaire ?')) {
                axios
                    .delete(`${process.env.VUE_APP_API}/api/comment/${this.commentId}`, {
                        headers: {
                            'Authorization': `Bearer ${this.accessToken}`
                            }
                        })
                    .then(() => {
                        this.$emit('deleteComment')
                    })
                    .catch(error => {
                        switch(error.response.status) {
                            case 400:
                                alert('Le commentaire n\'a pas été supprimé');
                                break;

                            case 401:
                                this.doLogout();
                                break;

                            case 403:
                                alert('Vous n\'avez pas la permission de supprimer ce commentaire')
                                break;
                        }
                        console.error(error)
                    })
            }
        },
        openUpdateForm() {
            this.currentlyUpdating = true
            this.updatingContent = this.content
        },
        closeUpdateForm() {
            this.currentlyUpdating = false
        },
        updateComment() {
            axios
            .put(`${process.env.VUE_APP_API}/api/comment/${this.commentId}`, {
                content: this.updatingContent
                }, {  
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })
            .then(() => {
                this.$emit('updateComment')
                this.closeUpdateForm()
            })
            .catch(error => {
                switch(error.response.status) {
                    case 400:
                        alert('Le commentaire n\'a pas été mis à jour')
                        break;

                    case 401:
                        this.doLogout();
                        break;

                    case 403:
                        alert('Vous n\'avez pas la permission de mettre à jour ce commentaire')
                        break;
                }
                console.log(error)
            })
        }
    },
  mounted() {
      this.getDate()
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

    .comment-card {
        color: $bg-color-tertiary;
        background-color: $bg-color-primary;
        margin: map-get($margin, medium) map-get($margin, none);
        overflow: hidden;

        display: grid;
        grid-template-areas: 
            "commentCaption"
            "commentContent"
            "commentButtons";
        grid-template-columns: 1fr;


        @include for-tablet {
            grid-template-areas:
                "commentCaption commentButtons"
                "commentContent commentContent";
            grid-template-columns: 4fr 1fr;
        }

        &__content {
            grid-area: commentContent;
            padding: map-get($padding, large);
            margin: map-get($margin, none);
            text-align: left;
        }
        &__caption {
            grid-area: commentCaption;
            font-size: .8rem;
            color: $bg-color-tertiary;
            justify-self: start;
            margin: map-get($margin, small) map-get($margin, medium);

            display: flex;
            justify-content: center;
            align-items: center;

            span {
                padding: map-get($padding, small);
            }

            svg {
                width: 1.8em;
                height: 1.8em;
            }
        }
        &__buttons {
            grid-area: commentButtons;
            justify-self: end;
        }
    }

    .button-delete, .button-edit {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: $bg-color-tertiary;

        svg {
            width: 1.8em;
            height: 1.8em;
        }
        &:hover {
            color: $color-primary;
        }
        &:focus-visible {
            outline: none;
        }
    }

    .content-update {
        display: flex;
        flex-direction: column;

        &__textarea {
            padding: .5rem;
            margin: map-get($margin, medium) map-get($margin, none);
            border: 1px solid transparent;
            border-radius: map-get($border-radius, small);
            background-color: $bg-color-secondary;
            outline: none;
            resize: vertical;

            &:focus {
                border: 1px solid $color-primary;
            }
        }
    }

    .update-buttons {
        display: flex;
        justify-content: center;
        &__item {
            max-width: 100px;
            padding: .5rem;
            margin: map-get($margin, none) map-get($margin, medium) ;
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: map-get($border-radius, small);
            background-color: $bg-color-tertiary;
            color: $color-tertiary;
            font-weight: bold;

            &:hover {
                @include box-shadow;
                background-color: $color-primary;
                color: $color-tertiary;
            }
            &:focus-visible {
                outline: 1px solid $color-primary;
            }
        }
    }
</style>