<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  }
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="search-bar">
    <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Search..."
    class="search-input"
    />
  </div>
</template>

<style scoped>
.search-bar{
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  background-color: white;
  border:1px solid #e2e8f0;
  border-radius: 50px;
  box-shadow: 2px 2px 2px #e2e2e2;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.search-input{
  width:100%;

  border:none;
  background:transparent;
  outline:none;
  padding: 18px 22px;
  font-size: 16px;

  border-radius: 50px;
}

</style>
