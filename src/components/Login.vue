<template>
	<div class="login-wrapper">
		<div class="wrap">
			<div class="layout-panel">
				<div class="layout">
					<div class="mainbox">
						<div class="login-banner">
							<img :src="require('../assets/img/milogo.png')" alt="logo">
							<h4 class="login-header-title">
								小米账号登录
							</h4>
						</div>
						<div class="main-box">
							<form action="/pass/serviceLoginAuth" method="POST" id="login-form">
								<div class="login-panel">
									<label for="" id="region-code" class="labelbox login-user">
										<div class="country-list">
											<div class="countrycode-selector">
												<span class="country-code">
													<tt class="countrycode-val">+86</tt>
													<i class="icon-arrow-down"></i>
												</span>
											</div>
										</div>
										<input type="tel" class="item-account" autocomplete="off" name="user" id="username" placeholder="手机号码">
									</label>
									<label for="" class="labelbox pwd-panel">
										
									</label>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>