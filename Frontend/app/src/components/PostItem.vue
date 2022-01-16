<template>

    <router-link class="post-link" v-if="getLink" :to="{ name: 'Post', params: {id: postId} }">
        <article class="post-card post-card--clickable">
            <h3 class="post-card__title">{{ title }}</h3>
            <div class="post-card__caption">
                <IconAuthor />
                <span>{{ firstname }} {{ lastname }}</span>
                <IconDate /> 
                <span v-bind:title="calendarDate">{{ relativeDate }}</span>   
            </div>
            <p class="post-card__content">{{ content }}</p>
            <div class="post-card__commentcount">
                <span>{{ commentcount }}</span>
                <IconComment />
            </div>
            <div class="post-card__buttons" v-if="isAdmin || isAuthor">
                <button class="button-delete" @click.prevent="deletePost">
                    <IconTrash />
                </button>
            </div>
        </article>
    </router-link>


    <article v-else class="post-card">
        <h2 v-if="!currentlyUpdating" class="post-card__title">{{ title }}</h2>
        <div class="post-card__caption">
            <IconAuthor />
            <span>{{ firstname }} {{ lastname }}</span>
            <IconDate /> 
            <span v-bind:title="calendarDate">{{ relativeDate }}</span>   
        </div>

        <div class="post-card__content post-card__content--update post-update" v-if="currentlyUpdating">
            <input class="post-update__item" type="text" v-model="updatingTitle" required>
            <textarea class="post-update__item post-update__item--textarea" v-model="updatingContent" rows="4" required></textarea>
            <div class="post-update__buttons post-buttons">
                <button class="post-buttons__item" @click.prevent="updatePost">Confirmer</button>
                <button class="post-buttons__item" @click.prevent="closeUpdateForm">Annuler</button>
            </div>
        </div>

        <p v-else class="post-card__content">{{ content }}</p>
        <div class="post-card__buttons" v-if="isAdmin || isAuthor">
          <button class="button-edit" @click.prevent="openUpdateForm">
              <IconEdit />
          </button>
          <button class="button-delete" @click.prevent="deletePost">
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
import IconComment from './icons/IconComment.vue'
import IconAuthor from './icons/IconAuthor.vue'
import IconDate from './icons/IconDate.vue'
import IconEdit from './icons/IconEdit.vue'

export default {
    name: 'PostItem',
    components: {
        IconTrash,
        IconComment,
        IconAuthor,
        IconDate,
        IconEdit
    },
    data() {
        return {
            relativeDate: '',
            calendarDate: '',
            currentlyUpdating: false,
            updatingTitle: '',
            updatingContent: ''
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
        postId: {
            type: Number
        },
        title: {
            type: String
        },
        date: {},
        content: {
            type: String
        },
        firstname: {
            type: String
        },
        authorId: {
            type: Number
        },
        lastname: {
            type: String
        },
        getLink: {
            type: Boolean
        },
        commentcount: {
            type: Number
        }
    },
    methods: {
        getDate() {
            moment.locale("fr");
            this.relativeDate = moment(this.date).fromNow()
            this.calendarDate = moment(this.date).format('LLLL')
        },
        deletePost() {
            if (confirm('Etes-vous certain de vouloir supprimer ce post ?')) {
                axios
                    .delete(`${process.env.VUE_APP_API}/post/${this.postId}`, {
                        headers: {
                            'Authorization': `Bearer ${this.accessToken}`
                        }
                    })
                    .then(() => {
                        this.$emit('deletePost')
                    })
                    .catch(error => {
                        switch(error.response.status) {
                            case 400:
                                alert('Le post n\'a pas été supprimé');
                                break;

                            case 401:
                                this.doLogout();
                                break;

                            case 403:
                                alert('Vous n\'avez pas la permission de supprimer ce post')
                                break;
                        }
                        console.error(error)
                    })
            }
        },
        openUpdateForm() {
            this.currentlyUpdating = true
            this.updatingTitle = this.title
            this.updatingContent = this.content
        },
        closeUpdateForm() {
            this.currentlyUpdating = false
        },
        updatePost() {
            axios
            .put(`${process.env.VUE_APP_API}/post/${this.postId}`, {
                title: this.updatingTitle,
                content: this.updatingContent
                }, {  
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })
            .then(() => {
                this.$emit('updatePost')
                this.closeUpdateForm()
            })
            .catch(error => {
                switch(error.response.status) {
                    case 400:
                        alert('Le post n\'a pas été mis à jour')
                        break;

                    case 401:
                        this.doLogout();
                        break;

                    case 403:
                        alert('Vous n\'avez pas la permission de mettre à jour ce post')
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
@import "@/assets/scss/_typography.scss";
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

    .post-card {
        margin: map-get($margin, medium) map-get($margin, none);
        background-color: $bg-color-primary;
        overflow: hidden;
        width: 100%;

        @include for-large-mobile {
            border: 1px solid transparent;
            border-radius: map-get($border-radius, small);
            @include box-shadow;
            width: 500px;

            &--clickable:hover {
                @include hover-box-shadow;
            }
        }

        @include for-tablet {
            width: 700px;
            grid-template-areas:
                "postCaption postButtons"
                "postTitle postTitle"
                "postContent postContent"
                ". postComCount";
            grid-template-columns: 4fr 1fr;
        }

        display: grid;
        grid-template-areas:
            "postCaption postCaption"
            "postTitle postTitle"
            "postContent postContent"
            "postButtons postComCount";
        grid-template-columns: repeat(2, 1fr);

        &__title {
            grid-area: postTitle;
            padding: map-get($padding, large);
            margin: map-get($margin, none);
            font-family: $font-secondary;
        }
        &__content {
            grid-area: postContent;
            padding: map-get($padding, large);
            margin: map-get($margin, none);
            text-align: justify;
        }
        &__caption {
            grid-area: postCaption;
            font-size: .8rem;
            color: $bg-color-tertiary;
            justify-self: start;
            margin: map-get($margin, small) map-get($margin, medium);

            display: flex;
            justify-content: center;
            align-items: center;

            span {
                padding: map-get($padding , small);
            }

            svg {
                width: 1.8em;
                height: 1.8em;
            }
        }
        &__commentcount {
            grid-area: postComCount;
            color: $bg-color-tertiary;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin: map-get($margin , small);

            p {
                margin: auto 0;
            }
            svg {
                width: 1.8em;
                height: 1.8em;
            }
        }
        &__buttons {
            grid-area: postButtons;
            justify-self: start;

            @include for-tablet {
                justify-self: end;
            }
        }
    }

    .post-link {
        text-decoration: none;
        color: black;
    }

    .button-delete, .button-edit {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: $bg-color-tertiary;
        margin: map-get($margin , small);

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

    .post-update {
        display: flex;
        flex-direction: column;

        &__item {
            padding: .5rem;
            margin: map-get($margin, medium) map-get($margin, none);
            border: 1px solid transparent;
            border-radius: map-get($border-radius, small);
            background-color: $bg-color-secondary;
            outline: none;

            &--textarea {
                resize: vertical;
            }

            &:focus {
                border: 1px solid $color-primary;
            }
        }
    }

    .post-buttons {
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