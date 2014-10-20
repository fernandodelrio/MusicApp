#import "Youtube.h"

@implementation Youtube

- (void)search:(CDVInvokedUrlCommand *)command {
    CDVPluginResult* pluginResult = nil;
    if(command.arguments.count > 0) {
        
        NSString* artist = [command.arguments objectAtIndex:0];
        NSString *artistURL = [NSString stringWithFormat:@"https://www.youtube.com/results?search_query=%@",artist];
        NSURL *url = [NSURL URLWithString:artistURL];
        [[UIApplication sharedApplication] openURL:url];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Youtube opened!"];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Invalid parameters"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


@end
