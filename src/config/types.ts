import { CustomFeatures } from './custom-types';
import { Guild } from 'api/discord';
import { ReactElement, ReactNode } from 'react';

export type AppConfig = {
  /**
   * bot name
   */
  name: string;
  /**
   * icon (react component)
   */
  icon?: (props: any) => ReactElement;
  /**
   * Guild settings
   */
  guild: GuildConfig;
  /**
   * Url to invite the bot
   *
   * example: `https://discord.com/api/oauth2/authorize?client_id=907955781972918281&permissions=8&scope=bot`
   */
  inviteUrl: string;

  pages?: {
    /**
     * The Dashboard page
     */
    useDashboard?: () => ReactElement;

    /**
     * The Profile page
     */
    useProfile?: () => ReactElement;
  };
};

export type GuildConfig = {
  /**
   * Filter configurable guilds
   *
   * ex: to allow only if user permissions include ADMINISTRATOR
   * ```
   * import { PermissionFlags } from 'api/discord';
   * (Number(guild.permissions) & PermissionFlags.ADMINISTRATOR) !== 0
   * ```
   */
  filter: (guild: Guild) => boolean;
  features: {
    [K in keyof CustomFeatures]: FeatureConfig<K>;
  };
};

export interface GuildInfo {
  enabledFeatures: string[];
}

/**
 * Internal Feature info
 */
export interface FeatureConfig<K extends keyof CustomFeatures> {
  name: string;
  description?: string;
  icon?: ReactElement;
  /**
   * Render content in Feature view
   */
  useRender: (data: CustomFeatures[K]) => FeatureRender;
  /**
   * Render skeleton before featrue is loaded
   */
  useSkeleton?: () => ReactNode;
}

export type FeatureRender = {
  /**
   * Save bar will be disappeared if `canSave` is false
   */
  canSave?: boolean;

  /**
   * Get the form/json body of update feature request
   *
   * Should be handled by the server
   *
   * endpoint: (PATCH `/guilds/{guild}/features/{feature}`)
   */
  serialize: () => FormData | string;

  /**
   * Reset current value
   */
  reset?: () => void;
  component: ReactElement;
};
