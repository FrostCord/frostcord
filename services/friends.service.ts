import { Database } from '@/types/database.supabase';
import { DetailedProfileRelation } from '@/types/dbtypes';
import { SupabaseClient } from '@supabase/supabase-js';

// NOTE: RLS is enforced such that only records that contain the current user's id can be returned
export async function getFriends(supabase: SupabaseClient<Database>) {
  return await supabase
    .rpc('detailed_profile_relations')
    .filter('relation', 'eq', 'friend')
    .returns<DetailedProfileRelation>();
}

export async function getFriendRequests(supabase: SupabaseClient<Database>) {
  return await supabase
    .rpc('detailed_profile_relations')
    .filter('relation', 'eq', 'friend_requested')
    .returns<DetailedProfileRelation>();
}

export async function getBlockedUsers(supabase: SupabaseClient<Database>) {
  return await supabase
    .rpc('detailed_profile_relations')
    .filter('relation', 'eq', 'blocked')
    .returns<DetailedProfileRelation>();
}

export async function getRelationships(supabase: SupabaseClient<Database>) {
  return await supabase
    .rpc('detailed_profile_relations')
    .returns<DetailedProfileRelation>();
}

export async function sendFriendRequest(supabase: SupabaseClient<Database>, targetUserId: string) {
  return supabase
    .from('profile_relations')
    .insert({
      user1: (await supabase.auth.getUser()).data.user?.id!,
      user2: targetUserId,
      relationship: 'friend_requested',
    })
    .single();
}