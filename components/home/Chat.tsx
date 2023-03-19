import ChannelMessageIcon from '../icons/ChannelMessageIcon';
import { useRef, useEffect } from 'react';
import styles from '@/styles/Chat.module.css';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import MessageInput from './MessageInput';
import type { MessageWithServerProfile, Message as MessageType } from '@/types/dbtypes';
import { createMessage  } from '@/services/message.service';
import Message from '@/components/home/Message';
import { useChannel, useMessages, useUserPerms } from '@/lib/store';
import { Channel } from '@/types/dbtypes';
import { ChannelMediaIcon } from '@/components/icons/ChannelMediaIcon';
import { ChannelPermissions } from '@/types/permissions';

export default function Chat() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const newestMessageRef = useRef<null | HTMLDivElement>(null);
  const messages = useMessages();
  const channel = useChannel();
  const userPerms = useUserPerms();

  useEffect(() => {
    if (newestMessageRef && messages) {
      newestMessageRef.current?.scrollIntoView({
        block: 'end',
        behavior: 'auto',
      });
    }
  }, [newestMessageRef, messages]);

  return (
    <>
      <div className={`${styles.chatHeader} px-5 pt-5 mb-3`}>
        <div className="flex items-center  ">
          <div className="mr-2">
            {channel && channel.is_media ? (
              <ChannelMediaIcon />
            ) : (
              <ChannelMessageIcon size="5" />
            )}
          </div>
          <h1 className=" text-3xl font-semibold tracking-wide">
            {channel ? channel.name : ''}
          </h1>
        </div>
      </div>
      <div className="border-t-2 mx-5 border-grey-700 flex "></div>

      <div
        className={`${styles.messagesParent}  flex flex-col p-5 bg-grey-800 overflow-y-scroll`}
      >
        <div className={`${styles.messageList} flex flex-col `}>
          {messages &&
            messages.map((value, index: number, array) => {
              // Get the previous message, if the authors are the same, we don't need to repeat the header (profile picture, name, etc.)
              const previousMessage: MessageWithServerProfile | null = index > 0 ? array[index - 1] : null;

              return (
                <Message
                  key={value.id}
                  message={value}
                  collapse_user={
                    !!previousMessage &&
                    previousMessage.profile.id === value.profile.id
                  }
                  hasDeletePerms={
                    (userPerms & ChannelPermissions.MANAGE_MESSAGES) !== 0
                  }
                />
              );
            })}
          <div ref={newestMessageRef} className=""></div>
        </div>
      </div>
      <div className="flex grow"></div>
      <MessageInput
        onSubmit={async (content: string) => {
          createMessage(supabase, {
            content,
            channel_id: (channel as Channel).channel_id,
            profile_id: user!.id,
          });
        }}
        disabled={!(userPerms & ChannelPermissions.SEND_MESSAGES)}
        channelName={(channel as Channel).name}
      />
    </>
  );
}
