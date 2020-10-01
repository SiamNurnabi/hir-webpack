import { Button } from "antd"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { showRoomFinderModal } from "~/Store/ModalState"
import { IRoom } from "~/Component/Section/RoomFinder/RoomFinderModal"

function RoomFinder(props: { onSelectRoom: (room: IRoom) => void }) {
  const dispatch = useDispatch()
  const showRoomFinder: () => void = useCallback(
    () => dispatch(showRoomFinderModal(true, { onSelectRoomCallback: props.onSelectRoom })),
    [dispatch, props.onSelectRoom]
  )

  return (
    <Button aria-label="Room Finder" onClick={showRoomFinder}>
      Room Finder
    </Button>
  )
}

export default RoomFinder
