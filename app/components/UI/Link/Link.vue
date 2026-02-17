<template>
    <component
        :is="to ? 'router-link' : 'a'"
        :href="href"
        :to="to"
        :target="target"
        :rel="computedRel"
        :class="[
            'link',
            `link--${variant}`,
            `link--${size}`,
            {
                'link--disabled': disabled,
                'link--underline': underline,
                'link--no-underline': !underline,
                [`link--icon-${iconPosition}`]: icon
            }
        ]"
        :aria-disabled="disabled"
        @click="handleClick"
    >
        <span v-if="icon && iconPosition === 'left'" class="link__icon">{{ icon }}</span>
        <span v-if="iconPosition !== 'only'" class="link__text"><slot /></span>
        <span v-if="icon && iconPosition === 'right'" class="link__icon">{{ icon }}</span>
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
    href?: string
    to?: RouteLocationRaw
    variant?: 'primary' | 'secondary' | 'muted' | 'success' | 'danger' | 'warning' | 'info'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    disabled?: boolean
    underline?: boolean
    icon?: string
    iconPosition?: 'left' | 'right' | 'only'
    target?: '_blank' | '_self' | '_parent' | '_top'
    rel?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    disabled: false,
    underline: true,
    iconPosition: 'left'
})

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const computedRel = computed(() => 
    props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined)
)

const handleClick = (e: MouseEvent) => {
    if (props.disabled) {
        e.preventDefault()
        e.stopPropagation()
    } else {
        emit('click', e)
    }
}
</script>

<style scoped lang="scss">
@import "./Link.scss";
</style>
