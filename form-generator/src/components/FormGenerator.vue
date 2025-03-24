<template>
    <form class="w-50 mx-auto mt-5">
        <h1>Form</h1>
        <div class="form-group">
            <label for="name">Input</label>
            <input type="text" class="form-control" id="name" placeholder="Enter name">
        </div>
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>


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

<style scoped></style>