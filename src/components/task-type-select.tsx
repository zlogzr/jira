import { IdSelect } from '@/components/id-select'
import { useTaskTypes } from '@/hook/task-type'
import React from 'react'

export const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={taskTypes || []} {...props} />
}
