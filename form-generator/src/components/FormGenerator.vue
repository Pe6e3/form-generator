<template>
    <div class="form-generator">
        <div class="card shadow-sm">
            <div class="card-body">
                <h1 class="card-title text-center mb-4">{{ form.title }}</h1>

                <form class="w-75 mx-auto">
                    <div v-for="element in form.elements" :key="element.index" class="mb-4">
                        <div v-if="element.type === 'input'" class="form-group">
                            <label for="name" class="form-label">{{ element.label }}</label>
                            <input type="text" v-model="element.value" :placeholder="element.placeholder"
                                class="form-control">
                        </div>

                        <div v-else-if="element.type === 'select'" class="form-group">
                            <label for="name" class="form-label">{{ element.label }}</label>
                            <select v-model="element.selectedValue" class="form-select">
                                <option v-for="value in element.values" :key="value" :value="value">{{ value.name }}
                                </option>
                            </select>
                        </div>

                        <div v-else-if="element.type === 'checkbox'" class="form-group">
                            <label class="form-label">{{ element.label }}</label>
                            <div v-for="value in element.values" :key="value" class="form-check">
                                <input type="checkbox" :value="value" v-model="element.selectedValues"
                                    class="form-check-input">
                                <label class="form-check-label">{{ value.name }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-primary me-md-2">Отправить</button>
                        <button type="reset" class="btn btn-outline-secondary">Сбросить</button>
                    </div>
                </form>
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
}
</script>

<style lang="scss" scoped>
.form-generator {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;

    .card {
        border-radius: 8px;
        border: none;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-label {
        font-weight: 500;
        margin-bottom: 0.5rem;
    }

    .form-control,
    .form-select {
        &:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
    }

    .form-check {
        margin-bottom: 0.5rem;
    }
}
</style>