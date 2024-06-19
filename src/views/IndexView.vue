<template>
  <div class="EntryForm">
    <EntryFormComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import EntryFormComponent from '@/components/EntryFormComponent.vue';

export default {
  name: 'IndexView',
  components: {
    EntryFormComponent
  }
}
</script>
