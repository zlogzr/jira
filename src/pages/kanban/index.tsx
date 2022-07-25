import { ScreenContainer } from '@/components/lib'
import { useKanbans } from '@/hook/kanban'
import { useDocumentTitle } from '@/hook/useDocumentTitle'
import styled from '@emotion/styled'

import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const Kanban = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map(kanban => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`
