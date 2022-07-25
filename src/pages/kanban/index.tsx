import { ScreenContainer } from '@/components/lib'
import { useKanbans } from '@/hook/kanban'
import { useTasks } from '@/hook/task'
import { useDocumentTitle } from '@/hook/useDocumentTitle'
import styled from '@emotion/styled'
import { Spin } from 'antd'

import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { TaskModal } from './task-modal'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util'

export const Kanban = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={'large'} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map(kanban => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
