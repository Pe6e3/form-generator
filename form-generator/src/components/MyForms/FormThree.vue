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



            <!-- Кастомизация поля Страна -->
            <template #страна="{ element }">

                <div class="form-group">

                    <label for="country" class="form-label">
                        {{ element.label }} 
                        <span class="text-danger">*</span>
                    </label>


                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="bi bi-flag"></i>
                        </span>
                        <select v-model="element.value" class="form-select" :disabled="element.isDisabled"
                            @change="handleInputChange(element)">

                            <option v-for="value in element.values" :key="value.name" :value="value.name"
                                :selected="value.isSelected">
                                {{ value.name }}
                            </option>
                        </select>
                    </div>

                </div>


            </template>

            <!-- Кастомизация поля Email -->
            <template #email="{ element }">
                <label for="email" class="form-label">
                    {{ element.label }}
                    <span class="text-danger">*</span>
                </label>
                <div class="input-group">
                    <span class="input-group-text">
                        <i class="bi bi-envelope"></i>
                    </span>
                    <input type="email" v-model="element.value" :placeholder="element.placeholder" class="form-control"
                        :disabled="element.isDisabled" @input="handleInputChange(element)">
                </div>
            </template>

            <!-- Кастомизация поля Комментарий -->
            <template #комментарий="{ element }">
                <label for="comment" class="form-label">
                    {{ element.label }}
                    <small class="text-muted">(необязательно)</small>
                </label>
                <div class="input-group" >
                    <span class="input-group-text" >
                        <i class="bi bi-chat-dots"></i>
                    </span>
                    <textarea v-model="element.value"  :placeholder="element.placeholder" class="form-control"
                        :disabled="element.isDisabled" :rows="element.rows"
                        @input="handleInputChange(element)"></textarea>
                </div>
            </template>

            <!-- Кастомизация поля Хобби -->
            <template #хобби="{ element }">
                <label class="form-label">
                    {{ element.label }}
                    <small class="text-muted">(выберите хотя бы одно)</small>
                </label>
                <div class="row">
                    <div v-for="value in element.values" :key="value.name" class="col-md-6">
                        <div class="form-check">
                            <input type="checkbox" :value="value.name" v-model="element.value" class="form-check-input"
                                :checked="value.isSelected" @change="handleInputChange(element)">
                            <label class="form-check-label">{{ value.name }}</label>
                        </div>
                    </div>
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
    name: 'FormThree',
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
                color: 'green',
                textColor: 'white',
                action: () => {
                    const formData = this.collectFormData(this.form);
                    alert(`Отправка: ${this.form.title}:\n${JSON.stringify(formData, null, 2)}`);
                }
            });

            this.setButtonCancel({
                text: 'Отменить',
                color: 'orange',
                textColor: 'darkred',
                action: () => {
                    alert('Отменить');
                }
            });


            this.form = this.generateForm('Форма №3 (Кастомизация полная)');
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