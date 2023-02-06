import Image, { StaticImageData } from 'next/image';
import VerticalSettingsIcon from '@/components/icons/VerticalSettingsIcon';
import ChannelMessageIcon from '../icons/ChannelMessageIcon';
import { SyntheticEvent } from 'react';

//NOTE: this is a temp type just for testing...to be removed or possibly extracted to the types dir under client
type Server = {
  id: string;
  name: string;
  icon: StaticImageData;
  members: string;
  onlineMembers: string;
  channels: Channel[];
};
//NOTE: this is a temp type just for testing...to be removed or possibly extracted to the types dir under client
type Channel = {
  id: string;
  name: string;
  description: string;
  server_id: string;
};

export default function Server({
  server,
  expanded,
}: {
  server: Server;
  expanded: string;
}) {
  const expand = expanded == server.id;

  function testClick(e: SyntheticEvent) {
    e.stopPropagation();
    console.log('test');
  }

  if (expand) {
    return (
      <div className="pt-4 relative">
        <div className="border-b-2 hover:cursor-pointer border-grey-700 py-2 px-3 flex bg-grey-600 justify-between rounded-xl items-center relative z-10 ">
          <div className="flex items-center">
            <div className="bg-grey-900 p-2 rounded-xl">
              <Image
                className="w-5"
                src={server.icon}
                alt="Supabase"
                priority
              />
            </div>
            <div className="ml-3">
              <div className="text-lg tracking-wide font-bold">
                {server.name}
              </div>
              <div className="text-xs tracking-wide text-grey-300 flex">
                <div className="flex items-center">
                  <span className="p-1 bg-green-300 rounded-full mr-1"></span>
                  <span>{server.onlineMembers} Online</span>
                </div>
                <div className="flex items-center ml-2">
                  <span className="p-1 bg-grey-300 rounded-full mr-1"></span>
                  <span>{server.members} Members</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <VerticalSettingsIcon />
          </div>
        </div>
        <div className="channels bg-grey-700 rounded-lg relative -top-3 py-4 px-8">
          {server.channels.map((channel) => (
            <div
              className="channel flex items-center pt-2"
              onClick={(e) => testClick(e)}
              key={channel.id}
            >
              <div>
                <ChannelMessageIcon />
              </div>
              <div className="ml-2">{channel.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4 hover:cursor-pointer">
      <div className="border-b-2 border-grey-700 py-2 px-3 flex justify-between hover:bg-grey-700 hover:rounded-xl items-center">
        <div className="flex items-center">
          <div className="bg-grey-900 p-2 rounded-xl">
            <Image className="w-5" src={server.icon} alt="Supabase" priority />
          </div>
          <div className="ml-3">
            <div className="text-lg tracking-wide font-bold">{server.name}</div>
            <div className="text-xs tracking-wide text-grey-300 flex">
              <div className="flex items-center">
                <span className="p-1 bg-green-300 rounded-full mr-1"></span>
                <span>{server.onlineMembers} Online</span>
              </div>
              <div className="flex items-center ml-2">
                <span className="p-1 bg-grey-300 rounded-full mr-1"></span>
                <span>{server.members} Members</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <VerticalSettingsIcon />
        </div>
      </div>
    </div>
  );
}