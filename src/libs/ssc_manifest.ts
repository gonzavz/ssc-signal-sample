import {Expose, plainToClass, Type} from 'class-transformer';
import {IsDefined, IsEnum, IsNotEmpty, IsOptional, IsUrl, MaxLength, validate} from 'class-validator';
import 'reflect-metadata';

/* tslint:disable:variable-name */

enum Factors {
  NETWORK_SECURITY='network_security',
  LEAKED_INFORMATION='leaked_information',
  DNS_HEALTH='dns_health',
  SOCIAL_ENGINEERING='social_engineering',
  PATCHING_CADENCE='patching_cadence',
  ENDPOINT_SECURITY='endpoint_security',
  IP_REPUTATION='ip_reputation',
  APPLICATION_SECURITY='application_security',
  CUBIT_SCORE='cubit_score',
  HACKER_CHATTER='hacker_chatter'
}

enum Severity {
  INFO = 'info',
  POSITIVE = 'positive'
}

class Reference {
  @Expose()
  @IsDefined({message: 'is required'})
  @IsUrl({protocols: ['http', 'https']})
  public link!: string

  @Expose()
  @MaxLength(200, {message: 'should be less than 200 chars'})
  @IsDefined({message: 'is required'})
  @IsNotEmpty({message: 'is required'})
  public text!: string
}

class SSCSignal {
  @Expose()
  @IsDefined({message: 'is required'})
  @IsNotEmpty({message: 'is required'})
  public id!: string

  @Expose()
  @IsDefined({message: 'is required'})
  @IsNotEmpty({message: 'is required'})
  public name!: string

  @Expose()
  @IsEnum(Severity)
  @IsDefined({message: 'is required'})
  public severity!: string

  @Expose()
  @IsEnum(Factors)
  @IsDefined({message: 'is required'})
  public factor!: string

  @Expose()
  @IsOptional()
  public long_description!: string

  @Expose()
  @IsOptional()
  public recommendation!: string

  @Expose()
  @IsDefined({message: 'is required'})
  @IsNotEmpty({message: 'is required'})
  public sent_by!: string

  @Expose()
  @IsOptional()
  public my_scorecard_only?: boolean

  @Expose()
  @Type(() => Reference)
  public references!: Reference[]
}

export class SSCManifest {
  public static fromJSON(json: object): any {
    return plainToClass(this, json, {excludeExtraneousValues: true});
  }

  public async isValid(): Promise<boolean> {
    const errors = await validate(this, { validationError: { target: true } });
    return errors.length > 0;
  }

  @Expose()
  @IsDefined({message: 'is required'})
  @IsNotEmpty({message: 'is required'})
  public name!: string

  @Expose()
  @IsDefined({message: 'is required'})
  @IsUrl({protocols: ['http', 'https']})
  public url!: string

  @Expose()
  @IsDefined({message: 'is required'})
  public description!: string

  @Expose()
  @IsOptional()
  public long_description!: string

  @Expose()
  @IsDefined({message: 'is required'})
  @IsUrl({protocols: ['http', 'https']})
  public homepage!: string

  @Expose()
  @IsOptional()
  public tags?: string[]
  // this url can be relative to the location of this json

  @Expose()
  @IsOptional()
  public logo_url!: string

  @Expose()
  @IsOptional()
  public hero_images!: string[]

  // primary domain of the company maintaining this marketplace app
  // (must match a scorecard in our platform).
  // Note this can match the source of the signal data or not.
  @Expose()
  @IsDefined({message: 'is required'})
  @IsNotEmpty({message: 'is required'})
  public developer!: string

  // optional, if scorecard signals are provided,
  // this is a url where users can be taken to submit a refute
  @Expose()
  @IsUrl({protocols: ['http', 'https']})
  @IsOptional()
  public refute_url?: string

  // optional, a webhook url where we'd send POSTs on events
  // like "app installed" (everytime a user installs this app) (add events list)
  @Expose()
  @IsUrl({protocols: ['http', 'https']})
  @IsOptional()
  public hook_url?: string

  @Expose()
  @IsDefined({message: 'is requried'})
  @Type(() => SSCSignal)
  public signals!: SSCSignal[]
}