<template>
    <div>
        <form-generator v-if="form" :form="form" class="w-50 mx-auto" @button-click="handleButtonClick"
            @input-change="handleInputChange" />
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
        };
    },
    mounted() {
        this.initForm();
    },
    methods: {
        ...mapActions(useFormStore, ['addInput', 'addSelect', 'addCheckbox', 'addRadio', 'addTextarea', 'addButton', 'addSubmit', 'generateForm', 'setButtonOk', 'setButtonCancel', 'updateElementValue', 'collectFormData']),

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
                    const formData = this.collectFormData(this.form);
                    console.log(`Данные формы ${this.form.title}:`, formData);
                }
            });

            this.setButtonCancel({
                text: 'Отменить',
                color: 'orange',
                textColor: 'darkred',
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