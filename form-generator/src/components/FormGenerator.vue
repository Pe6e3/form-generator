<template>
    <div class="form-generator">

        <form class="w-50 mx-auto mt-5 ">
            <h1>Form</h1>

            <div v-for="element in form.elements" :key="element.index">

                <div v-if="element.type === 'input'" class="form-field">
                    <label for="name">{{element.label}}</label>
                    <input type="text" v-model="element.value" :placeholder="element.placeholder" class="form-control">
                </div>


                <div v-else-if="element.type === 'select'" class="form-field">
                    <label for="name">{{element.label}}</label>
                    <select v-model="element.selectedValue">
                        <option v-for="value in element.values" :key="value" :value="value">{{ value.name }}</option>
                    </select>
                </div>


                <div v-else-if="element.type === 'checkbox'" class="form-field">
                    <label for="name">{{element.label}}</label>

                    <div v-for="value in element.values" :key="value"  class="d-flex">
                        <input type="checkbox" :value="value" v-model="element.selectedValues"> 
                        <label>{{ value.name }}</label>
                    </div>
                </div>


            </div>







        </form>
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
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;

    .form-field {
        margin-bottom: 20px;

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        select,
        textarea {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;

            &:focus {
                outline: none;
                border-color: #4CAF50;
            }
        }

        .checkbox-group {
            display: flex;
            align-items: center;
            gap: 8px;

            .checkbox-label {
                font-size: 16px;
            }
        }
    }

    .form-actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;

            &-primary {
                background-color: #4CAF50;
                color: white;

                &:hover {
                    background-color: #45a049;
                }
            }

            &-secondary {
                background-color: #f44336;
                color: white;

                &:hover {
                    background-color: #da190b;
                }
            }
        }
    }
}
</style>