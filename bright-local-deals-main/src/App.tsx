const App = () => {

  useEffect(() => {
    const registerPush = async () => {
      try {
        const permission = await PushNotifications.requestPermissions();

        if (permission.receive === 'granted') {
          await PushNotifications.register();
        }

        PushNotifications.addListener('registration', token => {
          console.log('Push Token:', token.value);
        });

        PushNotifications.addListener('registrationError', err => {
          console.error('Push registration error:', err);
        });

        PushNotifications.addListener('pushNotificationReceived', notification => {
          console.log('Push received:', notification);
        });

        PushNotifications.addListener('pushNotificationActionPerformed', notification => {
          console.log('Push action performed:', notification);
        });

      } catch (error) {
        console.error("Push setup failed:", error);
      }
    };

    registerPush();
  }, []);


  const [showSplash, setShowSplash] = useState(() => {
    if (sessionStorage.getItem("lamha_opened")) return false;
    sessionStorage.setItem("lamha_opened", "1");
    return true;
  });

  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
          <CityProvider>
            <Toaster />
            <Sonner />
            {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
            <BrowserRouter>
              <ScrollToTop />
              <PopupAd />
              <Routes>

                <Route path="/" element={<Index />} />
                <Route path="/ad/:id" element={<AdDetail />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/featured" element={<FeaturedPage />} />
                <Route path="/add" element={<AddAdPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/privacy" element={<TermsPage />} />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="requests" element={<AdminRequests />} />
                  <Route path="requests/:id" element={<AdminRequestDetail />} />
                  <Route path="ads" element={<AdminAds />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="cities" element={<AdminCities />} />
                  <Route path="pricing" element={<AdminPricing />} />
                  <Route path="countdown" element={<AdminCountdown />} />
                  <Route path="stats" element={<AdminStats />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="privacy" element={<AdminTerms />} />
                  <Route path="popup-ads" element={<AdminPopupAds />} />
                  <Route path="banner-slides" element={<AdminBannerSlides />} />
                  <Route path="support" element={<AdminSupport />} />
                </Route>

                <Route path="*" element={<NotFound />} />

              </Routes>
              <BottomTabBar />
            </BrowserRouter>
          </CityProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};