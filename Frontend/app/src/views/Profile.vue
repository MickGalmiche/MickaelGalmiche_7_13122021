<template>

    <section class="profile">

        <aside class="profile__buttons profile-buttons">
            <button title="Éditer le profil" class="profile-buttons__item" @click.prevent="openUpdateForm">
                <IconEdit />
            </button>

            <button title="Se déconnecter" class="profile-buttons__item" @click.prevent="logout">
                <IconLogout />
            </button>

            <button title="Supprimer le compte" class="profile-buttons__item" @click.prevent="deleteAccount">
                <IconDelUser />
            </button>
        </aside>

        <article v-if="currentlyUpdating" class="profile__content">
            <h3>Modifier mon profil</h3>
            
            <Form
                class="profile__form profile-form"
                @submit="profileUpdateSubmit"
                :validation-schema="schema"
            >

                <Field
                    name="firstname"
                    label="Nom"
                    type="text"
                    class="profile-form__item"
                    placeholder="Nom"
                />
                <ErrorMessage name="firstname" class="form-error" />

                <Field
                    name="lastname"
                    label="Prénom"
                    type="text"
                    class="profile-form__item"
                    placeholder="Prénom"
                />
                <ErrorMessage name="lastname" class="form-error" />

                <Field
                    name="email"
                    label="Email"
                    type="email"
                    class="profile-form__item"
                    placeholder="Email"
                />
                <ErrorMessage name="email" class="form-error" />

                <Field
                    name="password"
                    label="Mot de passe"
                    type="password"
                    class="profile-form__item"
                    placeholder="Mot de passe"
                />
                <ErrorMessage name="password" class="form-error" />

                <button class="profile-form__button" type="submit">Confirmer</button>
                <button class="profile-form__button" @click.prevent="closeUpdateForm">Annuler</button>

            </Form>
        </article>
        <article v-else class="profile__content">
            <h2 class="profile__title">Mon profil</h2>
            <p class="profile__name"><IconProfile /> {{ profile.firstname }} {{ profile.lastname }}</p>
            <p class="profile__email"><IconMail /> {{ profile.email }}</p>
        </article>
    </section>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import { Field, Form, ErrorMessage } from 'vee-validate'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelUser from '@/components/icons/IconDelUser.vue'
import IconLogout from '@/components/icons/IconLogout.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
import IconMail from '@/components/icons/IconMail.vue'

export default {
    name: 'Profile',
    components: {
        Field,
        Form,
        ErrorMessage,
        IconEdit,
        IconDelUser,
        IconLogout,
        IconProfile,
        IconMail
    },
    data() {
        const schema = {
            firstname: 'required',
            lastname: 'required',
            email: 'required|email',
            password: 'required|min:6'
        };
        return {
            profile: {},
            schema,
            currentlyUpdating: false,
        }
    },
    computed: {
        ...mapState([
          'accessToken',
          'userId',
          'userRole'
        ]),
    },
    methods: {
        fetchProfile() {
            axios
                .get(`${process.env.VUE_APP_API}/api/auth/profile/${this.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`
                    }
                })
                .then(response => (this.profile = response.data))
                .catch(error => {
                    console.log(error)
                })
        },
        openUpdateForm() {
            this.currentlyUpdating = true
        },
        closeUpdateForm() {
            this.currentlyUpdating = false
        },
        profileUpdateSubmit(values, { resetForm }) {
            axios
                .put(`${process.env.VUE_APP_API}/api/auth/profile/${this.userId}`, {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email,
                    password: values.password    
                },{
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`
                    }
                })
                .then(() => {
                    resetForm();
                    this.fetchProfile()
                    this.closeUpdateForm()
                })
                .catch(error => {
                    console.log(error)
                })

        },
        ...mapActions([
            'doLogout'
        ]),
        logout() {
            this.doLogout()
        },
        deleteAccount() {
            if (confirm('Etes-vous certain de vouloir supprimer votre compte ?')) {
                axios
                    .delete(`${process.env.VUE_APP_API}/api/auth/delete/${this.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${this.accessToken}`
                        }
                    })
                    .then(() => {
                        alert('Votre compte a bien été supprimé !')
                        this.doLogout()
                    })
                    .catch(error => {
                        console.log(error)
                        switch (error.response.status) {
                            case 403:
                                alert('Vous n\'avez pas la permission de supprimer ce compte')
                                break;
                            
                            case 401:
                                this.doLogout();
                                break;

                            case 400:
                                alert('Nous n\'avons pu procéder à la suppression de ce compte')
                                break;
                        }
                    })
            }
        }
    },
    beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchProfile()
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_mixins.scss";

    .profile {
        background-color: $bg-color-primary;
        border-color: transparent;
        width: 100%;
        display: grid;
        grid-template-areas: 
        "profileTitle profileButtons"
        "profileContent profileContent";
        grid-template-columns: 1fr max-content;
        justify-content: center;
        align-items: center;

        @include for-large-mobile {
            width: 500px;
            margin-top: map-get($margin, large);
            padding: map-get($padding, medium);
            border-radius: map-get($border-radius, small);
            @include box-shadow;
        }

        @include for-tablet {
            width: 700px;
        }

        &__title {
            grid-area: profileTitle;
            font-family: $font-secondary;
        }

        &__buttons {
            grid-area: profileButtons;
            justify-self: end;
        }

        &__content {
            grid-area: profileContent;
        }
    }

    .profile-form {
        display: flex;
        flex-direction: column;
        padding: map-get($padding, medium);

        &__item {
            padding: .5rem;
            margin: map-get($margin, medium) map-get($margin, none);
            border: 1px solid transparent;
            border-radius: map-get($border-radius, small);
            background-color: $bg-color-secondary;
            outline: none;

            &:focus {
                background-color: $color-secondary;
                border: 1px solid $color-primary;
            }
        }
        &__button {
            align-self: center;
            max-width: 100px;
            padding: .5rem;
            margin: map-get($margin, medium) map-get($margin, none);
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: map-get($border-radius, small);
            background-color: $bg-color-tertiary;
            color: $color-tertiary;
            font-weight: bold;

            &:hover {
                @include hover-box-shadow;
                background-color: $color-primary;
                color: $color-tertiary;
            }

            &:focus-visible {
                outline: 1px solid $color-primary;
            }
        }
    }

    .profile-buttons__item {
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
</style>