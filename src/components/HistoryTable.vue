<template>
    <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Сумма</th>
              <th>Дата</th>
              <th>Категория</th>
              <th>Тип</th>
              <th>Открыть</th>
            </tr>
          </thead>

          <tbody>
            <tr
                v-for="(record, idx) in records"
                :key="record.id"
            >
              <td>{{ idx + 1 }}</td>
              <td>{{record.amount | currency('RUB')}}</td>
              <td>{{ record.date | date('date')}}</td>
              <td>{{record.categoryName}}</td>
              <td>
                <span 
                    class="white-text badge"
                    :class="[record.typeClass]"
                >{{record.typeText}}</span>
              </td>
              <td>
                <button 
                    class="btn-small btn"
                    @click="$router.push('/detail/' + record.id)"
                >
                  <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
</template>

<script>
export default {
    props: {
        records: {
            reuired: true,
            type: Array,
        }
    }
}
</script>