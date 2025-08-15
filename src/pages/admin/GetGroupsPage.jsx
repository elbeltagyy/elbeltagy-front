import { useState } from "react"
import CreateGroup from "../../components/groups/CreateGroup"
import TitleWithDividers from "../../components/ui/TitleWithDividers"
import { FilledHoverBtn } from "../../style/buttonsStyles"
import { FlexColumn } from "../../style/mui/styled/Flexbox"
import ModalStyled from "../../style/mui/styled/ModalStyled"
import Section from "../../style/mui/styled/Section"
import GetGroups from "../../components/groups/GetGroups"

function GetGroupsPage() {

  const [open, setOpen] = useState(false)
  const [reset, setReset] = useState(false)

  return (
    <Section>
      <TitleWithDividers title={"صفحه المجموعات"} />

      <FlexColumn>
        <FilledHoverBtn onClick={() => setOpen(!open)}>
          انشاء مجموعه جديده
        </FilledHoverBtn>

        <GetGroups reset={reset} setReset={setReset} />

      </FlexColumn>

      <ModalStyled open={open} setOpen={setOpen} fullWidth={true}>
        <CreateGroup setReset={setReset} />
      </ModalStyled>

    </Section>
  )
}

export default GetGroupsPage
