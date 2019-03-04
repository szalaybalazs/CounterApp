//
//  Counter.m
//  CounterApp
//
//  Created by Szalay Balázs on 2019. 03. 04..
//  Copyright © 2019. Facebook. All rights reserved.
//

#import "React/RCTViewManager.h"
#import "React/RCTEventEmitter.h"
@interface RCT_EXTERN_MODULE(CounterViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(count, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onUpdate, RCTDirectEventBlock)
RCT_EXTERN_METHOD(
  updateFromManager:(nonnull NSNumber *)node
  count:(nonnull NSNumber *)count
)
@end
