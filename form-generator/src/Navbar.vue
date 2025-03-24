<template>
    <nav class="navbar navbar-expand-lg ">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link to="/form" class="nav-link">Форма 1</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/form" class="nav-link">Форма 2</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
        };
    },
    methods: {
    },

}
</script>

<style lang="scss" scoped>
.navbar {
    background: rgb(101, 101, 103) !important;
}

.nav-link {
    color: white !important;
    border: 1px solid lightblue;
    width: fit-content;
    margin: 5px;
    border-radius: 20px;
    padding: 5px 15px;
    transition: .3s;

    &:hover {
        background: white;
        color: rgb(0, 126, 230) !important;
        transition: .3s;
    }
}
</style>