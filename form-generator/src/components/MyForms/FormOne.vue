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
    components: {FormGenerator},

    computed:{
        ...mapState(useFormStore, ['form']),
    },
    data() {
        return {
        };
    },
    
}
</script>

<style scoped></style>