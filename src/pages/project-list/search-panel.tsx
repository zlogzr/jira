/* @jsxImportSource @emotion/react */
import { UserSelect } from '@/components/user-select'
import { Form, Input } from 'antd'

import { Project } from './list'

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

interface SearchPanelProps {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          type="text"
          value={param.name}
          onChange={evt =>
            setParam({
              ...param,
              name: evt.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          style={{ width: '12rem' }}
          defaultOptionName="负责人"
          value={param.personId}
          onChange={value =>
            setParam({
              ...param,
              personId: value
            })
          }
        />
      </Form.Item>
    </Form>
  )
}
