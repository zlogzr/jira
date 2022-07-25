import { Epic } from '@/pages/epic'
import { Kanban } from '@/pages/kanban'
import styled from '@emotion/styled'
import { Menu } from 'antd'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export const Project = () => {
  const routeType = useRouteType()
  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to={'kanban'}>看板</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route
            index
            element={<Navigate replace={true} to={window.location.pathname + '/kanban'} />}
          />
          {/*projects/:projectId/kanban*/}
          <Route path={'/kanban'} element={<Kanban />} />
          {/*projects/:projectId/epic*/}
          <Route path={'/epic'} element={<Epic />} />
        </Routes>
      </Main>
    </Container>
  )
}

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`
