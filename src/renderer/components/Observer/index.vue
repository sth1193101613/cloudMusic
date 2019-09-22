<template>
    <div class="observer">

    </div>
</template>

<script>
    export default {
        name: "index",
        props: {
            option: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                observer: null
            }
        },
        mounted() {
            this.observer = new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    this.$emit('intersect')
                }
            }, this.option)
            this.observer.observe(this.$el)
        },
        destroyed() {
            this.observer.disconnect()
        }
    }
</script>

<style scoped>

</style>