<template>
  <div class="tasks-page">
    <Header />
    
    <div class="page-content">
      <div class="container">
        <div class="page-header">
          <h1>Daily Tasks & Rewards</h1>
          <p>Complete tasks to earn PPO tokens and boost your balance</p>
        </div>
        
        <TaskSystem />
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import TaskSystem from '@/components/TaskSystem.vue'

export default {
  name: 'Tasks',
  components: {
    Header,
    Footer,
    TaskSystem
  }
}
</script>

<style scoped>
.tasks-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.page-content {
  padding: 50px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.page-header h1 {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-header p {
  font-size: 18px;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .page-content {
    padding: 30px 0;
  }
  
  .page-header h1 {
    font-size: 36px;
  }
  
  .page-header p {
    font-size: 16px;
  }
}
</style>
