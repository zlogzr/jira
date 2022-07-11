import { Button } from 'antd'
import { FormEvent } from 'react'
import './style.less'

// interface Base {
//   id: number
// }
//
// interface Advance extends Base {
//   name: string
// }
//
// const test = (p: Base) => {
// }
//
// // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// const a = {id: 1, name: 'jack'}
// test(a)

export const Login = () => {
  const login = (param: { username: string; password: string }) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    }).then(async response => {
      if (response.ok) {
        console.log(response)
      }
    })
  }

  // HTMLFormElement extends Element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    login({ username, password })
  }

  return (
    <div className="login-page-box">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">用户名</label>
          <input type="text" id={'username'} autoFocus />
        </div>
        <div>
          <label htmlFor="password">密码</label>
          <input type="password" id={'password'} />
        </div>
        <button type={'submit'}>登录</button>
      </form>
      <Button type="primary">123</Button>
    </div>
  )
}
