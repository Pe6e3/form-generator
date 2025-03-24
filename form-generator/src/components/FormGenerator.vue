<template>
    <div class="form-generator">
        <div class="card shadow-sm">
            <div class="card-body">
                <h1 class="card-title text-center mb-4">{{ form.title }}</h1>

                <div class="w-75 mx-auto">
                    <div v-for="element in form.elements" :key="element.index" class="mb-4">

                        <!-- input -->
                        <div v-if="element.type === 'input'" class="form-group">
                            <label for="name" class="form-label">{{ element.label }}</label>
                            <input type="text" v-model="element.value" :placeholder="element.placeholder"
                                class="form-control" :disabled="element.isDisabled" @input="handleInputChange(element)">
                        </div>


                        <!-- select -->
                        <div v-else-if="element.type === 'select'" class="form-group">
                            <label for="name" class="form-label">{{ element.label }}</label>

                            <select v-model="element.value" class="form-select" :disabled="element.isDisabled"
                                @change="handleInputChange(element)">
                                <option v-for="value in element.values" :key="value.name" :value="value.name"
                                    :selected="value.isSelected">
                                    {{ value.name }}
                                </option>
                            </select>
                        </div>


                        <!-- checkbox -->
                        <div v-else-if="element.type === 'checkbox'" class="form-group">
                            <label class="form-label">{{ element.label }}</label>
                            <div v-for="value in element.values" :key="value.name" class="form-check">
                                <input type="checkbox" :value="value.name" v-model="element.value"
                                    class="form-check-input" :checked="value.isSelected"
                                    @change="handleInputChange(element)">
                                <label class="form-check-label">{{ value.name }}</label>
                            </div>
                        </div>


                    </div>

                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button v-if="form.buttonOk && form.buttonOk.isShow" class="btn btn-primary me-md-2" :style="{
                            background: form.buttonOk.color,
                            color: form.buttonOk.textColor
                        }
                            " @click="form.buttonOk.action" :disabled="form.buttonOk.isDisabled">
                            {{ form.buttonOk.text }}
                        </button>

                        <button v-if="form.buttonCancel && form.buttonCancel.isShow" class="btn" :style="{
                            background: form.buttonCancel.color,
                            color: form.buttonCancel.textColor
                        }
                            " @click="form.buttonCancel.action" :disabled="form.buttonCancel.isDisabled">
                            {{ form.buttonCancel.text }}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormGenerator',
    data() {
        return {

        };
    },
    props: {
        form: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleInputChange(element) {
            this.$emit('input-change', {
                index: element.index,
                value: element.value
            });
        }
    }
}
</script>

<style lang="scss" scoped></style>