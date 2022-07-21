import { ReactComponent as SoftwareLogo } from '@/assets/software-logo.svg'
import { ButtonNoPadding, Row } from '@/components/lib'
import { ProjectPopover } from '@/components/project-popover'
import { useAuth } from '@/context/auth-context'
import { Project } from '@/pages/project'
import { ProjectList } from '@/pages/project-list'
import { ProjectModal } from '@/pages/project-list/project-modal'
import { resetRoute } from '@/utils'
import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <Router>
          <Routes>
            <Route index element={<Navigate to={'/projects'} />} />
            <Route
              path={'/projects'}
              element={
                <ProjectList
                  projectButton={
                    <ButtonNoPadding onClick={() => setProjectModalOpen(true)} type={'link'}>
                      创建项目
                    </ButtonNoPadding>
                  }
                />
              }
            />
            <Route path={'/projects/:projectId/*'} element={<Project />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  )
}

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              key: 'logout',
              label: (
                <Button onClick={logout} type={'link'}>
                  登出
                </Button>
              )
            }
          ]}
        />
      }
    >
      <Button type={'link'} onClick={e => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``
