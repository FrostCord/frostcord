import styles from '@/styles/DesktopView.module.css';
import NavBar from '@/components/home/NavBar';
import { useSideBarOptionValue } from '@/context/SideBarOptionCtx';
import FriendsList from '@/components/home/FriendsList';
import Chat from '@/components/home/Chat';
import DMessageList from '@/components/home/DMessageList';
import ServerList from '@/components/home/ServerList';
import DefaultTest from '@/components/home/DefaultTest';
import { useChannel } from '@/lib/store';
import { Channel } from '@/types/dbtypes';
import MediaChat from '@/components/home/MediaChat';
import { RoomAudioRenderer, TrackToggle } from '@livekit/components-react';
import { Track } from 'livekit-client';

export default function RenderDesktopView() {
  const channel = useChannel();
  const sideBarOption = useSideBarOptionValue();

  const [sideBarView, mainView] = renderContent(sideBarOption, channel);

  return (
    <div className={`${styles.container} `}>
      <RoomAudioRenderer/>
      <div className="col-start-1 col-end-2 bg-grey-950 flex-col justify-center ">
        <NavBar type="vertical" />
      </div>
      <div className="col-start-2 col-end-4 flex-col bg-grey-900 relative">
        {sideBarView}
        <div className={'bg-grey-950 w-full h-auto p-3 absolute bottom-[0px]'}>
          <TrackToggle showIcon={false} className={'w-7 h-7 bg-grey-900 rounded-lg text-lg'} source={Track.Source.Microphone} initialState={false}>
          Mic
          </TrackToggle> 
        </div>
      </div>
      <div className="col-start-4 col-end-13 flex flex-col h-screen">
        {mainView}
      </div>
    </div>
  );
}

export function renderContent(
  sideBarOption: 'friends' | 'servers' | 'messages',
  channel: Channel | null
) {
  switch (sideBarOption) {
    case 'friends':
      if (channel) return [<FriendsList key={1} />, <Chat key={2} />];
      return [<FriendsList key={1} />, <DefaultTest key={2} />];
    case 'servers':
      if (channel)
        if (channel.is_media) return [<ServerList key={1} />, <MediaChat key={2} />];
        else return [<ServerList key={1} />, <Chat key={2} />];
      return [<ServerList key={1} />, <DefaultTest key={2} />];
    case 'messages':
      if (channel) return [<DMessageList key={1} />, <Chat key={2} />];
      return [<DMessageList key={1} />, <DefaultTest key={2} />];
    default:
      return [<FriendsList key={1} />, <DefaultTest key={2} />];
  }
}
