import { useProjects } from '@/hook/project'
import { useProjectModal } from '@/pages/project-list/util'
import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'

import { ButtonNoPadding } from './lib'

export const ProjectPopover = () => {
  const { open } = useProjectModal()
  const { data: projects, refetch } = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map(project => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={'link'}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )

  return (
    <Popover onVisibleChange={() => refetch()} placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
