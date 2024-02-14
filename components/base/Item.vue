<script>
export default {
  name: 'Item',

  props: {
    item: {
      type: Object,
      default: () => ({
        href: undefined,
        icon: undefined,
        subtitle: undefined,
        title: undefined,
        to: undefined,
      }),
    },
    text: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    computedText() {
      if (!this.item || !this.item.title)
        return ''

      let text = ''

      this.item.title.split(' ').forEach((val) => {
        text += val.substring(0, 1)
      })

      return text
    },
    href() {
      return this.item.href || (!this.item.to ? '#' : undefined)
    },
  },
  mounted() {
  },
}
</script>

<template>
  <v-list
    lines="one"
    :href="href"
    :rel="href && href !== '#' ? 'noopener' : undefined"
    :target="href && href !== '#' ? '_blank' : undefined"
    :to="item.to"
    :active-class="`primary ${!isDark ? 'black' : 'white'}--text`"
  >
    <v-list-item :value="item">
      <template #prepend>
        <v-icon :icon="item.icon" />
      </template>

      <v-list-item-title>
        {{ item.text }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
