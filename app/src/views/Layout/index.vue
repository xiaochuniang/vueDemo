<template>
    <div>
        <LayoutHeader />
        <LayoutNav />
        <LayoutMain />
    </div>
</template>

<script>
import { setup } from '@vue/composition-api'
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import LayoutNav from './Components/Nav'
export default {
    name: 'layout',
    components: { LayoutHeader, LayoutMain, LayoutNav },
    setup(props, { root, refs }) {

    }
}
</script>

<style lang="scss" scoped>
    
</style>