/* tslint:disable */

/**
 * AUTO-GENERATED FILE @ 2021-10-11 18:15:29 - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.0.0.3
 * $ schemats generate -c postgresql://username:password@localhost:5432/raw?schema=mbelt -t _config -t account_identity -t blocks -t council_proposal -t democracy_proposal -t democracy_referenda -t eras -t events -t extrinsics -t nominators -t preimage -t technical_committee_proposal -t tips -t treasury_proposal -t validators -s mbelt
 *
 */

export namespace _configFields {
  export type key = string
  export type value = string | null
}

export interface _config {
  key: _configFields.key
  value: _configFields.value
}

export namespace account_identityFields {
  export type account_id = string
  export type created_at = number | null
  export type display = string | null
  export type email = string | null
  export type judgement_status = string | null
  export type killed_at = number | null
  export type legal = string | null
  export type registrar_index = number | null
  export type riot = string | null
  export type root_account_id = string | null
  export type twitter = string | null
  export type web = string | null
}

export interface account_identity {
  account_id: account_identityFields.account_id
  created_at: account_identityFields.created_at
  display: account_identityFields.display
  email: account_identityFields.email
  judgement_status: account_identityFields.judgement_status
  killed_at: account_identityFields.killed_at
  legal: account_identityFields.legal
  registrar_index: account_identityFields.registrar_index
  riot: account_identityFields.riot
  root_account_id: account_identityFields.root_account_id
  twitter: account_identityFields.twitter
  web: account_identityFields.web
}

export namespace blocksFields {
  export type author = string | null
  export type block_time = Date | null
  export type current_era = number | null
  export type digest = Object | null
  export type era = number | null
  export type extrinsics_root = string | null
  export type hash = string | null
  export type id = number
  export type last_log = string | null
  export type parent_hash = string | null
  export type session_id = number | null
  export type state_root = string | null
}

export interface blocks {
  author: blocksFields.author
  block_time: blocksFields.block_time
  current_era: blocksFields.current_era
  digest: blocksFields.digest
  era: blocksFields.era
  extrinsics_root: blocksFields.extrinsics_root
  hash: blocksFields.hash
  id: blocksFields.id
  last_log: blocksFields.last_log
  parent_hash: blocksFields.parent_hash
  session_id: blocksFields.session_id
  state_root: blocksFields.state_root
}

export namespace council_proposalFields {
  export type block_id = number | null
  export type data = Object | null
  export type event = string | null
  export type event_id = string
  export type extrinsic_id = string
  export type hash = string | null
  export type id = number
}

export interface council_proposal {
  block_id: council_proposalFields.block_id
  data: council_proposalFields.data
  event: council_proposalFields.event
  event_id: council_proposalFields.event_id
  extrinsic_id: council_proposalFields.extrinsic_id
  hash: council_proposalFields.hash
  id: council_proposalFields.id
}

export namespace democracy_proposalFields {
  export type block_id = number | null
  export type data = Object | null
  export type event = string | null
  export type event_id = string
  export type extrinsic_id = string
  export type hash = string | null
  export type id = number
}

export interface democracy_proposal {
  block_id: democracy_proposalFields.block_id
  data: democracy_proposalFields.data
  event: democracy_proposalFields.event
  event_id: democracy_proposalFields.event_id
  extrinsic_id: democracy_proposalFields.extrinsic_id
  hash: democracy_proposalFields.hash
  id: democracy_proposalFields.id
}

export namespace democracy_referendaFields {
  export type block_id = number | null
  export type data = Object | null
  export type event = string | null
  export type event_id = string
  export type extrinsic_id = string
  export type id = number
}

export interface democracy_referenda {
  block_id: democracy_referendaFields.block_id
  data: democracy_referendaFields.data
  event: democracy_referendaFields.event
  event_id: democracy_referendaFields.event_id
  extrinsic_id: democracy_referendaFields.extrinsic_id
  id: democracy_referendaFields.id
}

export namespace erasFields {
  export type era = number
  export type session_start = number | null
  export type total_reward = number | null
  export type total_reward_points = number | null
  export type total_stake = number | null
}

export interface eras {
  era: erasFields.era
  session_start: erasFields.session_start
  total_reward: erasFields.total_reward
  total_reward_points: erasFields.total_reward_points
  total_stake: erasFields.total_stake
}

export namespace eventsFields {
  export type block_id = number
  export type data = Object | null
  export type era = number | null
  export type event = Object | null
  export type id = string
  export type method = string | null
  export type section = string | null
  export type session_id = number | null
}

export interface events {
  block_id: eventsFields.block_id
  data: eventsFields.data
  era: eventsFields.era
  event: eventsFields.event
  id: eventsFields.id
  method: eventsFields.method
  section: eventsFields.section
  session_id: eventsFields.session_id
}

export namespace extrinsicsFields {
  export type args = Object | null
  export type block_id = number
  export type era = number | null
  export type extrinsic = Object | null
  export type id = string
  export type is_signed = boolean | null
  export type method = string | null
  export type mortal_period = number | null
  export type mortal_phase = number | null
  export type nonce = number | null
  export type parent_id = string | null
  export type ref_event_ids = Array<string> | null
  export type section = string | null
  export type session_id = number | null
  export type signer = string | null
  export type success = boolean | null
  export type tip = number | null
  export type version = number | null
}

export interface extrinsics {
  args: extrinsicsFields.args
  block_id: extrinsicsFields.block_id
  era: extrinsicsFields.era
  extrinsic: extrinsicsFields.extrinsic
  id: extrinsicsFields.id
  is_signed: extrinsicsFields.is_signed
  method: extrinsicsFields.method
  mortal_period: extrinsicsFields.mortal_period
  mortal_phase: extrinsicsFields.mortal_phase
  nonce: extrinsicsFields.nonce
  parent_id: extrinsicsFields.parent_id
  ref_event_ids: extrinsicsFields.ref_event_ids
  section: extrinsicsFields.section
  session_id: extrinsicsFields.session_id
  signer: extrinsicsFields.signer
  success: extrinsicsFields.success
  tip: extrinsicsFields.tip
  version: extrinsicsFields.version
}

export namespace nominatorsFields {
  export type account_id = string
  export type block_time = Date | null
  export type era = number
  export type is_clipped = boolean | null
  export type reward_account_id = string | null
  export type reward_dest = string | null
  export type validator = string
  export type value = number | null
}

export interface nominators {
  account_id: nominatorsFields.account_id
  block_time: nominatorsFields.block_time
  era: nominatorsFields.era
  is_clipped: nominatorsFields.is_clipped
  reward_account_id: nominatorsFields.reward_account_id
  reward_dest: nominatorsFields.reward_dest
  validator: nominatorsFields.validator
  value: nominatorsFields.value
}

export namespace preimageFields {
  export type block_id = number
  export type data = Object | null
  export type event = string | null
  export type event_id = string
  export type extrinsic_id = string | null
  export type proposal_hash = string
}

export interface preimage {
  block_id: preimageFields.block_id
  data: preimageFields.data
  event: preimageFields.event
  event_id: preimageFields.event_id
  extrinsic_id: preimageFields.extrinsic_id
  proposal_hash: preimageFields.proposal_hash
}

export namespace technical_committee_proposalFields {
  export type block_id = number | null
  export type data = Object | null
  export type event = string | null
  export type event_id = string
  export type extrinsic_id = string
  export type hash = string
  export type id = number | null
}

export interface technical_committee_proposal {
  block_id: technical_committee_proposalFields.block_id
  data: technical_committee_proposalFields.data
  event: technical_committee_proposalFields.event
  event_id: technical_committee_proposalFields.event_id
  extrinsic_id: technical_committee_proposalFields.extrinsic_id
  hash: technical_committee_proposalFields.hash
  id: technical_committee_proposalFields.id
}

export namespace tipsFields {
  export type block_id = number | null
  export type data = Object | null
  export type event = string | null
  export type event_id = string
  export type extrinsic_id = string
  export type hash = string
}

export interface tips {
  block_id: tipsFields.block_id
  data: tipsFields.data
  event: tipsFields.event
  event_id: tipsFields.event_id
  extrinsic_id: tipsFields.extrinsic_id
  hash: tipsFields.hash
}

export namespace treasury_proposalFields {
  export type block_id = number | null
  export type data = Object | null
  export type event = string | null
  export type event_id = string
  export type extrinsic_id = string
  export type id = number
}

export interface treasury_proposal {
  block_id: treasury_proposalFields.block_id
  data: treasury_proposalFields.data
  event: treasury_proposalFields.event
  event_id: treasury_proposalFields.event_id
  extrinsic_id: treasury_proposalFields.extrinsic_id
  id: treasury_proposalFields.id
}

export namespace validatorsFields {
  export type account_id = string
  export type block_time = Date | null
  export type era = number
  export type nominators_count = number | null
  export type own = number | null
  export type prefs = Object | null
  export type reward_account_id = string | null
  export type reward_dest = string | null
  export type reward_points = number | null
  export type total = number | null
}

export interface validators {
  account_id: validatorsFields.account_id
  block_time: validatorsFields.block_time
  era: validatorsFields.era
  nominators_count: validatorsFields.nominators_count
  own: validatorsFields.own
  prefs: validatorsFields.prefs
  reward_account_id: validatorsFields.reward_account_id
  reward_dest: validatorsFields.reward_dest
  reward_points: validatorsFields.reward_points
  total: validatorsFields.total
}
