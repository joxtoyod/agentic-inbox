// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

export interface AliasRoutingSettings {
	enabled: boolean;
}

export interface MailboxAliasSettings {
	aliasRouting?: AliasRoutingSettings;
}

export function normalizeEmailAddress(address: string): string {
	return address.trim().toLowerCase();
}

export function splitEmailAddress(address: string): {
	local: string;
	domain: string;
} | null {
	const normalized = normalizeEmailAddress(address);
	const at = normalized.lastIndexOf("@");
	if (at <= 0 || at === normalized.length - 1) return null;
	return {
		local: normalized.slice(0, at),
		domain: normalized.slice(at + 1),
	};
}

export function matchesAliasRoute(
	mailboxEmail: string,
	recipientEmail: string,
): boolean {
	const mailbox = splitEmailAddress(mailboxEmail);
	const recipient = splitEmailAddress(recipientEmail);
	if (!mailbox || !recipient) return false;
	if (mailbox.domain !== recipient.domain) return false;
	if (mailbox.local === recipient.local) return true;
	return (
		recipient.local.startsWith(`${mailbox.local}-`) ||
		recipient.local.startsWith(`${mailbox.local}+`)
	);
}

export function aliasRoutesOverlap(
	firstMailboxEmail: string,
	secondMailboxEmail: string,
): boolean {
	const first = splitEmailAddress(firstMailboxEmail);
	const second = splitEmailAddress(secondMailboxEmail);
	if (!first || !second) return false;
	if (first.domain !== second.domain) return false;
	if (first.local === second.local) return true;

	return (
		first.local.startsWith(`${second.local}-`) ||
		first.local.startsWith(`${second.local}+`) ||
		second.local.startsWith(`${first.local}-`) ||
		second.local.startsWith(`${first.local}+`)
	);
}

export function isAliasRoutingEnabled(
	settings: MailboxAliasSettings | null | undefined,
): boolean {
	return settings?.aliasRouting?.enabled === true;
}
