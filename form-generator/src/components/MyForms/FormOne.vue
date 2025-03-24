<template>
    <form-generator v-if="form" :form="form" class="w-50 mx-auto" />
</template>

<script>
import FormGenerator from '../FormGenerator.vue';
import { useFormStore } from '../../stores/formStore';
import { mapActions, mapState } from 'pinia';
export default {
    name: 'FormOne',
    components: { FormGenerator },

    computed: {
        // ...mapState(useFormStore, ['form']),
    },
    data() {
        return {
            form: null,
        };
    },
    mounted() {
        this.initForm();
    },
    methods: {
        ...mapActions(useFormStore, ['addInput', 'addSelect', 'addCheckbox', 'addRadio', 'addTextarea', 'addButton', 'addSubmit', 'generateForm', 'setButtonOk', 'setButtonCancel']),

        initForm() {
            this.addInput({
                label: 'Имя',
                value: '',
                placeholder: 'Введите имя'
            });

            this.addSelect({
                label: 'Страна',
                values: ['Россия', 'Казахстан', 'Беларусь'],
                selectedValue: 'Казахстан'
            });

            this.addCheckbox({
                label: 'Хобби',
                values: ['Спорт', 'Музыка', 'Чтение', 'Путешествия'],
                selectedValues: ['Музыка', 'Чтение']
            });

            this.addInput({
                label: 'Email',
                value: '',
                placeholder: 'example@mail.ru'
            });

            this.addSelect({
                label: 'Пол',
                values: ['Мужской', 'Женский'],
                selectedValue: 'Мужской'
            });

            this.addCheckbox({
                label: 'Языки программирования',
                values: ['JavaScript', 'Python', 'C++', 'Java'],
                selectedValues: ['JavaScript', 'Python']
            });

            this.setButtonOk({
                text: 'Отправить',
                color: 'green',
                textColor: 'white',
                action: () => {
                    console.log('Отправить');
                }
            });

            this.setButtonCancel({
                text: 'Отменить',
                color: 'red',
                textColor: 'white',
                action: () => {
                    console.log('Отменить');
                }
            });


            this.form = this.generateForm('Форма №1');
        },

    },

}
</script>

<style scoped></style>