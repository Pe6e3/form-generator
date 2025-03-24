<template>
    <div>

        <h1>Пример формы №1</h1>
        <pre>{{ form }}</pre>
        <form-generator />
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
        ...mapState(useFormStore, ['form']),
    },
    data() {
        return {
        };
    },
    mounted() {
        this.initForm();
    },
    methods: {
        ...mapActions(useFormStore, ['addInput', 'addSelect', 'addCheckbox', 'addRadio', 'addTextarea', 'addButton', 'addSubmit']),

        initForm() {
            this.addInput({
                label: 'Имя',
                value: '',
                placeholder: 'Введите имя'
            });

        }
    },

}
</script>

<style scoped></style>