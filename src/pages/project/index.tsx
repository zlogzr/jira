import { EpicScreen } from '@/pages/epic'
import { KanbanScreen } from '@/pages/kanban'
import { Navigate, Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'

export const Project = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route
          index
          element={<Navigate replace={true} to={window.location.pathname + '/kanban'} />}
        />
        {/*projects/:projectId/kanban*/}
        <Route path={'/kanban'} element={<KanbanScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path={'/epic'} element={<EpicScreen />} />
      </Routes>
    </div>
  )
}
