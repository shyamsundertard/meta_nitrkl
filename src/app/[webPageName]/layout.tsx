import SideBar from "components/SideBar"

export default function WebPageLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
         <div className="flex flex-row" >
            <SideBar/>
            {children}
        </div>
        </section>
  }
