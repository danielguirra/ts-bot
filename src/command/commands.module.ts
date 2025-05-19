import { AdviceCommand } from './advice.command';
import { AvatarCommand } from './avatar.command';
import { BanCommand } from './ban.command';
import { BibleVerseDayCommand } from './bible-ver-day.command';
import { Bible } from './bible.command';
import { BuzzCommand } from './buzz.command';
import { ClearChannelCommand } from './clear-channel.command';
import { ClimateOnDayCommand } from './climate-on-day';
import { ClimateCommand } from './climate.command';
import { CoinsCommand } from './coins.command';
import { DailyCommand } from './daily.command';
import { DeleteOnUserCommand } from './delete-db.command';
import { DiceCommand } from './dice.command';
import { DolarCommand } from './dolar.command';
import { DuelCommand } from './duel.command';
import { EditUserDbCommand } from './edit-user-db.command';
import { FryCommand } from './fry.command';
import { GifCommand } from './gif.command';
import { GrandediaCommand } from './grande-dia.command';
import { HelpCommand } from './help.command';
import { HourCommand } from './hour.command';
import { ImageSearchCommand } from './image-search.command';
import { ItsFineCommand } from './its-fine.command';
import { LeroleroCommand } from './lero-lero.command';
import { LoreleagueoflegendsCommand } from './lore-lol.command';
import { PdlCommand } from './pdl.command';
import { PeaceCommand } from './peace.command';
import { PingCommand } from './ping.command';
import { SaveUserCommand } from './save-db.command';
import { SkinsLolCommand } from './skins-lol.command';
import { TrustWillSmithCommand } from './trust-will-smith.command';

export const Commands = [
   new AvatarCommand(),
   new HourCommand(),
   new AdviceCommand(),
   new SkinsLolCommand(),
   new BanCommand(),
   new Bible(),
   new BibleVerseDayCommand(),
   new BuzzCommand(),
   new ClearChannelCommand(),
   new ClimateCommand(),
   new ClimateOnDayCommand(),
   new CoinsCommand(),
   new TrustWillSmithCommand(),
   new DailyCommand(),
   new DeleteOnUserCommand(),
   new DiceCommand(),
   new DolarCommand(),
   new DuelCommand(),
   new EditUserDbCommand(),
   new FryCommand(),
   new GifCommand(),
   new ImageSearchCommand(),
   new GrandediaCommand(),
   new HelpCommand(),
   new ItsFineCommand(),
   new LeroleroCommand(),
   new LoreleagueoflegendsCommand(),
   new PdlCommand(),
   new PeaceCommand(),
   new PingCommand(),
   new SaveUserCommand(),
];
