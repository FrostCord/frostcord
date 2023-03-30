import {
  useChannel,
  useCurrentRoomRef,
  useSetConnectionState,
  useSetCurrentRoomId,
  useSetCurrentRoomName,
  useSetCurrentRoomServerId,
  useSetToken,
  useUserRef,
} from '@/lib/store';
import styles from '@/styles/Chat.module.css';
import mediaStyle from '@/styles/Components.module.css';
import { ChannelMediaIcon } from '../icons/ChannelMediaIcon';
import ChannelMessageIcon from '../icons/ChannelMessageIcon';
import { useUser } from '@supabase/auth-helpers-react';
import {
  DisconnectButton,
  ParticipantName,
  useConnectionState,
  useToken,
  useParticipants,
  useTracks,
} from '@livekit/components-react';
import { Track, ConnectionState } from 'livekit-client';
import { Channel, User } from '@/types/dbtypes';
import { BsGear } from 'react-icons/bs';
import UserIcon from '../icons/UserIcon';
import ScreenShareIcon from '../icons/ScreenShareIcon';
import ScreenShareOff from '../icons/ScreenShareOff';
import { FloatingCallControl } from './FloatingCallControl';
import { MediaDispTrack } from './MediaDispTrack';
import { TrackBundle } from '@livekit/components-core';
import Modal from '@/components/home/Modal';
import { useEffect, useRef, useState } from 'react';

export default function MediaChat({ channel: visibleChannel }: { channel?: Channel }) {
  const channel = useChannel();
  const userID: User | any = useUser();
  const user = useUserRef();
  const setConnectionState = useSetConnectionState();
  const connectionState = useConnectionState();
  const setRoomIdRef = useSetCurrentRoomId();
  const setRoomName = useSetCurrentRoomName();
  const currentRoom = useCurrentRoomRef();
  const setRoomServerId = useSetCurrentRoomServerId();

  const participants = useParticipants();
  const tracks = useTracks([
    {source: Track.Source.Camera, withPlaceholder: true },
    {source: Track.Source.ScreenShare, withPlaceholder: false }
  ]);

  const [ showModal, setShowModal ] = useState(
    currentRoom.channel_id !== channel?.channel_id
    && connectionState === ConnectionState.Connected
  );
  const modalRef = useRef<HTMLDialogElement>(null);

  const token = useToken(
    process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT,
    channel!.channel_id.toString(),
    {
      userInfo: {
        identity: userID.id,
        name: user?.username,
      },
    }
  );

  useEffect(() => {
    if (currentRoom.channel_id !== channel?.channel_id && connectionState === ConnectionState.Connected) {
      modalRef.current?.showModal();
    }
  }, [currentRoom.channel_id, channel?.channel_id, connectionState]);

  return (
    <>
      <Modal
        modalRef={modalRef}
        showModal={showModal}
        title="Already Connected"
        buttons={
          <div className="flex flex-row w-full h-7">
            <button
              className="w-full"
              onClick={() => modalRef.current?.close()}
            >
              Cancel
            </button>
            <DisconnectButton
              className={
                'w-full bg-red-500 hover:bg-red-700 rounded-lg font-bold text-xl'
              }
              onClick={() => {
                setConnectionState(false);
                setRoomIdRef(0);
                setRoomName(undefined);
                modalRef.current?.close();
              }}
            >
              End
            </DisconnectButton>
          </div>
        }
      >
        <div>
          <p>
            {`Looks like you're already connected to ${currentRoom.name}...\n`}

            {'You\'ll need to end your current call before you can join another.'}
          </p>
        </div>
      </Modal>
      <div className={`${styles.chatHeader} px-5 pt-5 mb-3`}>
        <div className="flex items-center">
          <div className="mr-2">
            {channel && channel.is_media ? (
              <ChannelMediaIcon />
            ) : (
              <ChannelMessageIcon size="5" />
            )}
          </div>
          <h1 className="text-3xl font-semibold tracking-wide">
            {channel ? channel.name : ''}
          </h1>
        </div>
      </div>
      <div className="border-t-2 mx-5 border-grey-700 flex "></div>
      <div>
        <div className={'bg-grey-800 items-center'}>
          <div className="">
            <div
              className="grid gap-2 p-5 space-x-4 overflow-y-auto h-screen"
              style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(350px, 100%), 3fr))',
              }}
            >
              {connectionState === ConnectionState.Connecting ? (
                <div className="flex flex-row items-center mt-2">
                  <BsGear size={40} className="animate-spin mr-2" />
                  <span>Connecting...</span>
                </div>
              ) : (
                tracks.map((track) => {
                  // @ts-expect-error We need to check if the publication is here at all since the union type is jank
                  if (track.publication === undefined) {
                    return (
                      <div key={track.participant.sid}>
                        <div className="bg-slate-600 rounded-md">
                          <img
                            src="https://www.eurovps.com/blog/wp-content/uploads/2012/10/placeholder-images.jpg"
                            alt="placeholder"
                          />

                        </div>
                        <ParticipantName
                          participant={track.participant}
                          className="
                            text-lg
                            font-semibold
                            mt-2
                            py-1
                            px-2
                            rounded-md
                            bg-slate-900
                            text-center
                            float-right
                            relative
                            bottom-7
                            right-2
                          "
                        />
                      </div>
                    );
                  }

                  else {
                    return (
                      <MediaDispTrack
                        key={(track as TrackBundle).publication.trackSid}
                        track={track as TrackBundle}
                      />
                    );
                  }
                })
              )}

            </div>
            <FloatingCallControl visibleChannel={visibleChannel} token={token}/>
          </div>
        </div>
      </div>
    </>
  );
}
