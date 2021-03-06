import React, { Suspense } from "react"
import { Layout } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import Sidebar from "~/Component/Layout/Sidebar"
import { Breadcrumb } from "~/Component/Layout"
import ApiErrorAlert from "~/Component/ApiErrorAlert"
import { useSidebarCollapsed } from "~/Hooks/useSidebarCollapsed"

const { Header, Content, Footer } = Layout

interface ILayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout(props: ILayoutProps) {
  const [collapsed, setCollapsed] = useSidebarCollapsed()
  return (
    <Layout>
      <ApiErrorAlert />
      <Sidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <MenuToggle collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content style={{ padding: "0 20px" }}>
          <Breadcrumb />
          <Suspense fallback={<div>Loading ...</div>}>{props.children}</Suspense>
        </Content>
        <Footer style={{ textAlign: "center" }}>Jenzabar ©2020 Created by Jenzabar Team</Footer>
      </Layout>
    </Layout>
  )
}

interface IMenuToggle {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

function MenuToggle(props: IMenuToggle) {
  return (
    <>
      {props.collapsed && (
        <MenuUnfoldOutlined
          style={{ fontSize: "30px", paddingLeft: "15px", color: "white" }}
          onClick={() => props.setCollapsed(!props.collapsed)}
        />
      )}
      {!props.collapsed && (
        <MenuFoldOutlined
          style={{ fontSize: "30px", paddingLeft: "15px", color: "white" }}
          onClick={() => props.setCollapsed(!props.collapsed)}
        />
      )}
    </>
  )
}
