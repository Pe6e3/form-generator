<template>
    <div>
        <form-generator v-if="form" :form="form" class="w-50 mx-auto" @button-click="handleButtonClick"
            @input-change="handleInputChange">

            <!-- Кастомизация поля Имя -->
            <template #имя="{ element }">
                <label for="name" class="form-label">
                    {{ element.label }}
                    <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                    <span class="input-group-text">
                        <i class="bi bi-person"></i>
                    </span>
                    <input type="text" v-model="element.value" :placeholder="element.placeholder" class="form-control"
                        :disabled="element.isDisabled" @input="handleInputChange(element)">
                </div>
            </template>

 

        </form-generator>
    </div>
</template>

<script>
import FormGenerator from '../FormGenerator.vue';
import { useFormStore } from '../../stores/formStore';
import { mapActions, mapState } from 'pinia';
export default {
    name: 'FormTwo',
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

            this.addTextarea({
                label: 'Комментарий',
                value: '',
                placeholder: 'Введите ваш комментарий',
                rows: 4
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
                action: () => {
                    const formData = this.collectFormData(this.form);
                    alert(`Отправка: ${this.form.title}:\n${JSON.stringify(formData, null, 2)}`);
                }
            });

            this.setButtonCancel({
                text: 'Отменить',
                action: () => {
                    alert('Отменить');
                }
            });


            this.form = this.generateForm('Форма №2 Кастомизация поля Имя');
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