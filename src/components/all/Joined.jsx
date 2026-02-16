import { Box, IconButton } from "@mui/material"
import TitleWithDividers from "../ui/TitleWithDividers"
import TabsAutoStyled from "../../style/mui/styled/TabsAutoStyled"
import BtnConfirm from "../ui/BtnConfirm"
import { IoIosAddCircleOutline } from "react-icons/io"

function Joined({ object = {}, field, Compo, editFc, setReset, title }) {

    const editReset = (value) => {
        editFc(value)
        if (setReset) {
            setReset(p => !p)
        }
    }

    const allResets = [object[field]]

    const tabs = [
        {
            label: 'الكل', component: <Compo key={1} reset={allResets}
                selections={object[field] || []}
                massActions={[{
                    label: 'حفظ التغيرات', dontResetSelection: true,
                    onClick: (onlySelected) => editReset({ id: object._id, field, value: onlySelected, action: 'save' })
                }]}
            />
        },
        {
            label: 'المضاف', component: <Compo key={2} reset={allResets}
                filters={{ _id: object[field] || 'empty' }}
                deleteFc={(value) => 
                    editReset({
                        id: object._id, field, value, action: 'pull'
                    })
                }
                massActions={[{
                    label: 'ازاله الصفوف المختاره',
                    onClick: (onlySelected) => editReset({ id: object._id, field, value: onlySelected, action: 'pull' })
                }]}
            />
        }, {
            label: 'الغير مضاف', component: <Compo key={3}
                filters={{ _id: (object[field] || []).map(c => '!=_split_' + c) }} reset={allResets}
                massActions={[{
                    label: 'إضافه الصفوف المختاره',
                    onClick: (onlySelected) => editReset({ id: object._id, field, value: onlySelected, action: 'push' })
                }]}
                addColumns={[{
                    field: 'add',
                    headerName: 'إضافه',
                    type: 'actions',
                    renderCell: (clicked) => {
                        return <BtnConfirm
                            modalInfo={{
                                desc: 'سيتم اضافه هذا العنصر',
                            }}
                            btn={<IconButton color='success'
                                onClick={() => editReset({
                                    field, value: clicked.row._id, id: object._id, action: 'push'
                                })}>
                                <IoIosAddCircleOutline></IoIosAddCircleOutline>
                            </IconButton>} key={0} />
                    }
                }]}
            />
        },
    ]

    return (
        <Box>
            <TitleWithDividers title={title} />
            <TabsAutoStyled originalTabs={tabs} />
        </Box>
    )
}

export default Joined
