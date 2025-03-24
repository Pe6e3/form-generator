<template>
    <div class="form-generator">

        <form class="w-50 mx-auto mt-5 ">
            <h1>Form</h1>
            <div class="form-field">
                <label for="name">Input</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <div class="form-field">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email">
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="form-actions">

                <button type="submit" class="btn btn-primary">Submit</button>
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
    methods: {
    },
    computed: {
    }
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