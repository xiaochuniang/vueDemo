<template>
    <div class="header-body">
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
    .header-body{
        width: 100%;
        height: $layoutHeader;
        background-color: #fff;
        @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
        @include webkit(transition, all .3s ease 0s);
        
        position: fixed;
        top:0;
        left: 0;
        right: 0;
    }
</style>