<template>
    <div>
        <form-generator v-if="form" :form="form" class="w-50 mx-auto" @button-click="handleButtonClick"
            @input-change="handleInputChange">


        </form-generator>
    </div>
</template>

<script>
import FormGenerator from '../FormGenerator.vue';
import { useFormStore } from '../../stores/formStore';
import { mapActions, mapState } from 'pinia';
export default {
    name: 'FormOne',
    components: { FormGenerator },
    computed: {
        ...mapState(useFormStore, ['elements']),
    },

    data() {
        return {
            form: null,

            formData: {
                countries_list: ['Россия', 'Казахстан', 'Беларусь'],
                hobby_list: ['Спорт', 'Музыка', 'Чтение', 'Путешествия', 'Программирование', 'Танцы'],
                languages_list: ['Python', 'C++', 'Java', 'C#', 'JavaScript', 'TypeScrypt'],
                age_list: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
                gender_list: ['Мужской', 'Женский']
            },

            serverData: {
                name: 'Антон Ребезов',
                country: 'Казахстан',
                hobby: ['Спорт', , 'Путешествия', 'Чтение', 'Программирование', 'Лишнее хобби'],
                email: 'xpe6e3@gmail.com',
                comment: `
                Данный конструктор форм позволяет создавать формы и поддерживает элементы типа input, select, checkbox, textarea. Эти элементы можно добавлять в форму несколько раз и в разном порядке. Данные из них попадают в объект formData, который можно отправить на сервер или обработать на стороне клиента.
                Все поля формы можно кастомизировать с помощью слотов. 
                Атрибуты также можно передавать через них. Важные параметры передаются с помощью методов, логика которых прописана в сторе. Стор нужен только для отрисовки формы, сразу после чего он очищается.
                Можно выбирать цвет фона и текста кнопки, а также действия при нажатии на кнопку.
                В коде не используется TypeScript -  у меня пока нет опыта работы на нем, но я планирую освоить его и Composition API в дальнейшем
                `,
                gender: 'Мужской',
                languages: ['JavaScript', 'Python', 'C#'],
                age: 33
            }
        };
    },
    mounted() {
        this.initForm();
    },
    methods: {
        ...mapActions(useFormStore, ['addInput', 'addSelect', 'addCheckbox', 'addRadio', 'addTextarea', 'addButton', 'addSubmit', 'generateForm', 'setButtonOk', 'setButtonCancel', 'updateElementValue', 'collectFormData', 'resetForm']),

        handleButtonClick({ type, button }) {
            if (type === 'ok') {
                console.log('Отправить');
            } else if (type === 'cancel') {
                console.log('Отменить');
            }
        },

        handleInputChange({ index, value }) {
            this.updateElementValue(index, value);
        },

        initForm() {
            this.addInput({
                label: 'Имя',
                value: this.serverData.name,
                placeholder: 'Введите имя'
            });

            this.addSelect({
                label: 'Пол',
                values: this.formData.gender_list,
                selectedValue: this.serverData.gender
            });


            this.addSelect({
                label: 'Возраст',
                values: this.formData.age_list,
                selectedValue: this.serverData.age
            });

            this.addSelect({
                label: 'Страна',
                values: this.formData.countries_list,
                selectedValue: this.serverData.country
            });


            this.addCheckbox({
                label: 'Хобби',
                values: this.formData.hobby_list,
                selectedValues: this.serverData.hobby
            });

            this.addInput({
                label: 'Email',
                value: this.serverData.email,
                placeholder: 'example@mail.ru'
            });

            this.addTextarea({
                label: 'Комментарий',
                value: this.serverData.comment,
                placeholder: 'Введите ваш комментарий',
                rows: 15
            });




            this.addCheckbox({
                label: 'Языки программирования',
                values: this.formData.languages_list,
                selectedValues: this.serverData.languages
            });

            this.setButtonOk({
                action: () => {
                    const formData = this.collectFormData(this.form);
                    alert(`Отправка: ${this.form.title}:\n${JSON.stringify(formData, null, 2)}`);
                }
            });

            this.setButtonCancel({
                action: () => {
                    alert('Отменить');
                }
            });

            this.form = this.generateForm('Форма №1 данные "с сервера"');
        },
    },
}
</script>

<style scoped>
.input-group-text {
    background-color: #f8f9fa;
    border-right: none;
}

.input-group .form-control {
    border-left: none;
}

.input-group .form-control:focus {
    border-color: #ced4da;
}

.input-group:focus-within {
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>