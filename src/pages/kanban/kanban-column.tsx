import bugIcon from '@/assets/bug.svg'
import taskIcon from '@/assets/task.svg'
import { Drag, Drop, DropChild } from '@/components/drag-and-drop'
import { Row } from '@/components/lib'
import { Mark } from '@/components/mark'
import { useDeleteKanban } from '@/hook/kanban'
import { useTasks } from '@/hook/task'
import { useTaskTypes } from '@/hook/task-type'
import { Kanban } from '@/types/kanban'
import { Task } from '@/types/task'
import styled from '@emotion/styled'
import { Button, Card, Dropdown, Menu, Modal } from 'antd'
import React from 'react'

import { CreateTask } from './create-task'
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from './util'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) {
    return null
  }
  return (
    <img alt={'task-icon'} src={name === 'task' ? taskIcon : bugIcon} style={{ width: '1.6rem' }} />
  )
}

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTasksSearchParams()
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey())
  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗',
      onOk() {
        return mutateAsync({ id: kanban.id })
      }
    })
  }
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={'link'} onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  )
}

export const KanbanColumn = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(
  ({ kanban, ...props }, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    return (
      <Container {...props} ref={ref}>
        <Row between={true}>
          <h3>{kanban.name}</h3>
          <More kanban={kanban} key={kanban.id} />
        </Row>
        <TasksContainer>
          <Drop type={'ROW'} direction={'vertical'} droppableId={String(kanban.id)}>
            <DropChild style={{ minHeight: '1rem' }}>
              {tasks?.map((task, taskIndex) => (
                <Drag key={task.id} index={taskIndex} draggableId={'task' + task.id}>
                  <div>
                    <TaskCard key={task.id} task={task} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask kanbanId={kanban.id} />
        </TasksContainer>
      </Container>
    )
  }
)

KanbanColumn.displayName = 'KanbanColumn'

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: auto;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`
