<template>
  <div class="EntryForm">
    <EntryForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import EntryForm from '@/components/EntryForm.vue'

export default {
  name: 'IndexView',
  components: {
    EntryForm
  }
}
</script>
